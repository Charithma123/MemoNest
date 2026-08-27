"use client"
import { useEffect, useState, use } from "react";
import { API_URL } from "@/server";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import MoodPicker from "@/app/moodPicker";
import { moods, Mood } from "@/app/moods";
import { uploadImageToCloudinary } from "@/app/lib/cloudinary";
import { toast } from "react-toastify";

const UpdateJournal = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { user, loading } = useRequireAuth();
    const router = useRouter();

    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [content, setContent] = useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id && !loading && user) {
            const fetchJournal = async () => {
                try {
                    const token = await auth.currentUser?.getIdToken();
                    const response = await fetch(`${API_URL}/journals/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const responseData = await response.json();
                    const journal = responseData.data.journal;
                    setContent(journal.content);
                    setExistingImages(journal.images || []);
                    setSelectedMood(moods.find((m) => m.key === journal.mood) || null);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchJournal();
        }
    }, [id, loading, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            const token = await auth.currentUser?.getIdToken();

            const newUrls: string[] = [];
            for (const file of newFiles) {
                newUrls.push(await uploadImageToCloudinary(file));
            }

            const response = await fetch(`${API_URL}/journals/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ mood: selectedMood?.key, content, images: [...existingImages, ...newUrls] }),
            });

            if (response.ok) router.push("/");
            else toast.error("Failed to update journal");
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="w-[90%] max-w-xl mx-auto mt-16 mb-20">
            <h1 className="font-display text-3xl sm:text-4xl text-ink mb-8">Edit entry</h1>

            <MoodPicker selected={selectedMood?.key ?? null} onSelect={setSelectedMood} />

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <textarea
                    rows={10}
                    className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                {existingImages.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {existingImages.map((url) => (
                            <img key={url} src={url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                        ))}
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && setNewFiles(Array.from(e.target.files))}
                    className="block w-full text-sm text-ink-soft file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mist file:text-ink hover:file:bg-nest hover:file:text-canvas file:transition-colors"
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-nest text-canvas font-medium rounded-xl hover:bg-nest-deep transition-colors disabled:opacity-60"
                >
                    {saving ? "Saving..." : "Save changes"}
                </button>
            </form>
        </div>
    );
};

export default UpdateJournal;