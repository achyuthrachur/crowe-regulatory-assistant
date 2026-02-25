'use client';

import { useRef, useState, DragEvent } from 'react';
import { FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/lib/context/AppContext';
import { parseDocument } from '@/lib/parseDocument';
import { SYNTHETIC_MRA_DOCUMENT } from '@/lib/syntheticMRA';

export function UploadZone() {
  const { setDocument } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await parseDocument(file);
      setDocument({ content: result.content, filename: result.filename, pageCount: result.pageCount });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse document.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function loadSyntheticMRA() {
    setDocument({
      content: SYNTHETIC_MRA_DOCUMENT,
      filename: 'FirstHeartlandBank_MRA-2024-003.txt',
      pageCount: null,
    });
  }

  return (
    <div className="w-80 flex flex-col items-center">
      <div
        className="w-full rounded-xl border-2 border-dashed p-10 flex flex-col items-center gap-4 transition-all duration-150 cursor-pointer"
        style={{
          borderColor: isDragOver ? '#F5A800' : '#D0D5DD',
          backgroundColor: isDragOver ? 'rgba(245,168,0,0.04)' : '#FFFFFF',
          boxShadow: isDragOver ? '0 0 0 4px rgba(245,168,0,0.08)' : 'none',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <FileUp className="w-10 h-10 text-[#F5A800]" />
        <div className="flex flex-col items-center gap-1">
          <p
            className="text-base text-center"
            style={{
              color: '#011E41',
              fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            {isLoading ? 'Processing document...' : 'Upload Exam Document'}
          </p>
          <p className="text-xs text-[#828282]">PDF or plain text · Up to 10MB</p>
        </div>
        <Button
          disabled={isLoading}
          className="h-9 px-5 rounded-md mt-2 text-sm font-bold cursor-pointer"
          style={{
            backgroundColor: '#F5A800',
            color: '#011E41',
            fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
          }}
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          {isLoading ? 'Processing...' : 'Choose File'}
        </Button>
        <p className="text-[11px] text-[#BDBDBD]">or drag and drop</p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt,.md"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-500 text-center">{error}</p>
      )}

      <div className="mt-6 flex flex-col items-center gap-1">
        <p className="text-xs text-[#BDBDBD]">Demo document preloaded</p>
        <button
          className="text-xs underline cursor-pointer transition-colors"
          style={{ color: '#D7761D' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#F5A800')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#D7761D')}
          onClick={loadSyntheticMRA}
        >
          Load synthetic MRA document
        </button>
      </div>
    </div>
  );
}
