"use client"
import { API_URL } from '@/server';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { auth } from '@/app/lib/firebase';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import { uploadImageToCloudinary } from '@/app/lib/cloudinary';

const UpdateNote = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const { id } = use(params);
    const { user, loading } = useRequireAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id && !loading && user) {
            const fetchNote = async () => {
                try {
                    const token = await auth.currentUser?.getIdToken();
                    const response = await fetch(`${API_URL}/notes/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const responseData = await response.json();
                    const note = responseData.data.note;
                    setTitle(note.title);
                    setContent(note.content);
                    setExistingImages(note.images || []);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchNote();
        }
    }, [id, loading, user]);

    const removeExistingImage = (url: string) => {
        setExistingImages((prev) => prev.filter((img) => img !== url));
    };

    const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setSaving(true);
            const token = await auth.currentUser?.getIdToken();

            const newUrls: string[] = [];
            for (const file of newFiles) {
                newUrls.push(await uploadImageToCloudinary(file));
            }

            const noteData = {
                title,
                content,
                images: [...existingImages, ...newUrls],
            };

            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            });
            if (response.ok) router.push("/");
            else console.log("Failed to update note");
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="w-[90%] max-w-xl mx-auto mt-16 mb-20">
            <h1 className="font-display text-3xl sm:text-4xl text-ink mb-10">Update Note</h1>
            <div>
                <form onSubmit={updateHandler} className="space-y-4">
                    <input type='text'
                        placeholder='Title'
                        className='block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow font-display text-lg'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        rows={10}
                        placeholder='Your Note...'
                        className='block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {existingImages.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {existingImages.map((url) => (
                                <div key={url} className="relative">
                                    <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(url)}
                                        className="absolute -top-2 -right-2 w-5 h-5 bg-clay text-white rounded-full text-xs flex items-center justify-center"
                                    >
                                        ×
                                    </button>
                                </div>
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

                    <button type='submit'
                        disabled={saving}
                        className='px-6 py-3 bg-nest text-canvas font-medium rounded-xl hover:bg-nest-deep transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nest disabled:opacity-60'
                    >{saving ? "Saving..." : "Update Note"}</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateNote;