import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-medium">New post</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
