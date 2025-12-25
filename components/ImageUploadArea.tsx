import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconUpload } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${index % 2 === 0
                                ? "bg-gray-50 dark:bg-neutral-950"
                                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                                }`}
                        />
                    );
                })
            )}
        </div>
    );
}

interface ImageUploadAreaProps {
    onFileUpload: (file: File) => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ onFileUpload }) => {
    const { t } = useLanguage();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const handleFileChange = (file: File) => {
        // Validate file type
        if (file.type === 'image/png' || file.type === 'image/jpeg' ||
            file.name.toLowerCase().endsWith('.png') ||
            file.name.toLowerCase().endsWith('.jpg') ||
            file.name.toLowerCase().endsWith('.jpeg')) {
            onFileUpload(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive: dropzoneActive } = useDropzone({
        multiple: false,
        noClick: true,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                handleFileChange(acceptedFiles[0]);
            }
        },
        onDragEnter: () => setIsDragActive(true),
        onDragOver: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    });

    return (
        <div className="w-full" {...getRootProps()}>
            <motion.div
                onClick={handleClick}
                whileHover="animate"
                className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileChange(file);
                    }}
                    className="hidden"
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                    <GridPattern />
                </div>
                <div className="flex flex-col items-center justify-center relative z-10">
                    <p className="relative z-20 font-sans font-bold text-neutral-700 text-base">
                        {t('imageUpload.uploadFile')}
                    </p>
                    <p className="relative z-20 font-sans font-normal text-neutral-400 text-base mt-2">
                        {t('imageUpload.dragDrop')}
                    </p>
                    <div className="relative w-full mt-10 max-w-xl mx-auto">
                        {!isDragActive && !dropzoneActive ? (
                            <motion.div
                                layoutId="file-upload"
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className="relative group-hover/file:shadow-2xl z-40 bg-white flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                            >
                                <IconUpload className="h-4 w-4 text-neutral-600" />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative z-40 bg-white flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                            >
                                <p className="text-neutral-600 flex flex-col items-center">
                                    {t('imageUpload.dropIt')}
                                    <IconUpload className="h-4 w-4 text-neutral-600" />
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ImageUploadArea;

