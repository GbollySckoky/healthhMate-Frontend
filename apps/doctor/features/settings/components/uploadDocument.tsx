"use client";

import { useRef, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Doctor } from "@/lib/constant/service";

const UploadDocument = () => {
  const [documents, setDocuments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cancelDocument = (index: number) => {
    setDocuments((current) => current.filter((_, fileIndex) => fileIndex !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const mutation = useMutation({
    mutationFn: (payload: FormData) => Doctor.uploadDocument(payload),
    onSuccess: (response) => {
      toast.success(response.data?.message || "Documents uploaded successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Unable to upload documents");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mutation.isPending) return;
    if (!documents.length) {
      toast.error("Please select at least one document");
      return;
    }
    if (documents.some((file) => !/\.(pdf|doc|docx)$/i.test(file.name))) {
      toast.error("Please select PDF, DOC, or DOCX files");
      return;
    }

    const payload = new FormData();
    documents.forEach((document) => payload.append("document", document));
    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="px-5">
      <div className="mb-4 block w-full">
        <label htmlFor="document" className="font-medium text-[14px] font-inter text-[#414651]">
          Documents
        </label>
        <input
          id="document"
          ref={fileInputRef}
          name="document"
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          required={documents.length === 0}
          disabled={mutation.isPending}
          onChange={(event) => setDocuments(Array.from(event.target.files || []))}
          aria-describedby="document-help"
          className="block w-full mt-1 outline-none border border-borderColor100 rounded-md p-[7px] text-sm font-medium focus-visible:ring-2 focus-visible:ring-red-300 file:mr-4 file:rounded-md file:border-0 file:bg-pink-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-pink-600 file:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p id="document-help" className="mt-2 text-xs text-gray-500">
          Upload your documents in PDF, DOC, or DOCX format. You can select multiple files.
        </p>
        <div aria-live="polite" className="mt-4">
          {documents.length > 0 && (
            <>
              <p className="mb-2 text-sm font-medium text-[#414651]">
                Selected files ({documents.length})
              </p>
              <ul className="space-y-2">
                {documents.map((document, index) => (
                  <li
                    key={`${document.name}-${document.lastModified}-${index}`}
                    className="flex items-center justify-between gap-4 rounded-md border border-borderColor100 px-3 py-2 text-sm"
                  >
                    <span className="min-w-0 break-all font-medium text-[#414651]">
                      {document.name}
                    </span>
                    <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-gray-500">
                      {document.size < 1024 * 1024
                        ? `${(document.size / 1024).toFixed(1)} KB`
                        : `${(document.size / (1024 * 1024)).toFixed(1)} MB`}
                    </span>
                    <button
                      type="button"
                      disabled={mutation.isPending}
                      onClick={() => cancelDocument(index)}
                      aria-label={`Cancel upload of ${document.name}`}
                      className="text-sm font-medium text-pink-600 hover:text-pink-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
        <div className="border-t border-borderColor p-4 mt-6 flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`text-white rounded-lg px-4 py-2 ${mutation.isPending ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 cursor-pointer'}`}
          >
            {mutation.isPending ? "Uploading..." : "Upload Documents"}
          </button>
        </div>
      </form>
  );
};

export default UploadDocument;
