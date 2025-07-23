import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@repo/ui/components/shadcn/alert-dialog";

type AlertDialogOptions = {
  /** Custom content to render inside the dialog (overrides title/description) */
  content?: ReactNode;
  /** Fallback title if no content is provided */
  title?: ReactNode;
  /** Fallback description if no custom content is provided */
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

type AlertDialogContextValue = {
  open: (options: AlertDialogOptions) => void;
  close: () => void;
};

const AlertDialogContext = createContext<AlertDialogContextValue>({
  open: () => {},
  close: () => {},
});

export const useAlertDialog = () => useContext(AlertDialogContext);

export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertDialogOptions>({
    confirmText: "OK",
    cancelText: "Cancel",
  });

  const open = (opts: AlertDialogOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const handleConfirm = () => {
    close();
    options.onConfirm?.();
  };

  return (
    <AlertDialogContext.Provider value={{ open, close }}>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {children}
        <AlertDialogContent>
          {/* Render custom content if provided */}
          {options.content ? (
            options.content
          ) : (
            <>
              <AlertDialogHeader>
                {options.title && (
                  <AlertDialogTitle>{options.title}</AlertDialogTitle>
                )}
                {options.description && (
                  <AlertDialogDescription>
                    {options.description}
                  </AlertDialogDescription>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={close}>
                  {options.cancelText}
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>
                  {options.confirmText}
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
};
