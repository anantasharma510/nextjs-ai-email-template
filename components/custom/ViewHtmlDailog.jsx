import React from 'react'
import { Copy } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function ViewHtmlDailog({ openDialog, htmlCode, closeDialog }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Failed to copy!"));
  }

  return (
    <div>
      <Dialog onOpenChange={closeDialog} open={openDialog}>
        <DialogTrigger />
        <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              HTML CODE
            </DialogTitle>
            <Button
              onClick={copyToClipboard}
              className="absolute top-6 right-6 p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
            
              <Copy size={18} />
              <span>Copy Code</span>
            </Button>
            <DialogDescription
              className="mt-4 text-base text-gray-700 bg-gray-100 p-4 rounded-md max-h-64 overflow-y-auto"
            >
              {htmlCode}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewHtmlDailog
