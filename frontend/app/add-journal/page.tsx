"use client"
import { useState } from "react";
import { API_URL } from "@/server";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import MoodPicker from "../moodPicker";
import { Mood } from "../moods";
import { uploadImageToCloudinary } from "@/app/lib/cloudinary";
import { toast } from "react-toastify";

const AddJournal = () => {
    useRequireAuth();
    const router = useRouter();
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [prompt, setPrompt] = useState("");
    const [content, setContent] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleMoodSelect = (mood: Mood) => {
        setSelectedMood(mood);
        setPrompt("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMood) {
            toast.error("Please select a mood first");
            return;
        }
        try {
            setUploading(true);
            const token = await auth.currentUser?.getIdToken();

            const imageUrls: string[] = [];
            for (const file of imageFiles) {
                imageUrls.push(await uploadImageToCloudinary(file));
            }

            const response = await fetch(`${API_URL}/journals`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ mood: selectedMood.key, prompt, content, images: imageUrls }),
            });

            if (response.ok) router.push("/");
            else toast.error("Failed to save journal entry");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-[90%] max-w-xl mx-auto mt-16 mb-20">
            <h1 className="font-display text-3xl sm:text-4xl text-ink mb-8">How are you feeling?</h1>

            <MoodPicker selected={selectedMood?.key ?? null} onSelect={handleMoodSelect} />

            {selectedMood && (
                <div className="mt-6 animate-rise-in">
                    <p className="text-sm text-ink-soft mb-2">Need a nudge? Try one of these — or just start typing:</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {selectedMood.prompts.map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPrompt(p)}
                                className="text-xs px-3 py-2 rounded-full bg-mist text-ink-soft hover:bg-nest hover:text-canvas transition-colors"
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {prompt && <p className="font-display italic text-ink-soft text-sm">{prompt}</p>}
                        <textarea
                            rows={10}
                            placeholder="Write freely..."
                            className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))}
                            className="block w-full text-sm text-ink-soft file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mist file:text-ink hover:file:bg-nest hover:file:text-canvas file:transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-6 py-3 bg-nest text-canvas font-medium rounded-xl hover:bg-nest-deep transition-colors disabled:opacity-60"
                        >
                            {uploading ? "Saving..." : "Save entry"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddJournal;