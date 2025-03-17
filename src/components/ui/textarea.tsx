export function TextArea() {
  return (
    <div className="relative bg-neutral-800 rounded-4xl px-6 py-5 duration-300">
      <span className="absolute"></span>
      <textarea className="text-neutral-50 resize-none placeholder:text-neutral-700 text-sm" />
    </div>
  );
}
