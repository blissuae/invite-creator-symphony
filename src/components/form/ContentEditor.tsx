
interface ContentEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const ContentEditor = ({ content, onChange }: ContentEditorProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Write Your Message
      </h2>
      <div className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter the text for your digital invite..."
          className="w-full h-48 p-4 rounded-lg border border-form-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
        />
        <p className="text-sm text-gray-500 text-right">
          {content.length} characters
        </p>
      </div>
    </div>
  );
};
