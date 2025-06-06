import { useState, useRef } from "react";
import { supabase } from "../SupabaseClient";

export default function ProfilePhotoUploader({ user, onUpload }: { user: any; onUpload?: () => void }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.user_metadata?.avatar_url || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split(".").pop();
 const filePath = `avatars/${user.id}.${fileExt}`;

   console.log(filePath)


    setUploading(true);

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const publicUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    if (updateError) {
      console.error("Update avatar URL failed:", updateError.message);
    } else {
      setAvatarUrl(publicUrl);
      onUpload?.();
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-indigo-300 flex items-center justify-center text-white text-3xl font-bold">
            ?
          </div>
        )}
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-sm text-indigo-600 dark:text-indigo-300 underline"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Change Photo"}
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}
