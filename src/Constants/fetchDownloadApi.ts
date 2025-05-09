import { toast } from "sonner";
export const fetchDownloadApi = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/api/getfile/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
    
        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }
    
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = ''; // Browser uses filename from Content-Disposition
        a.click();
        URL.revokeObjectURL(url);
        toast.success("File has been downloaed successfully");
        console.log('✅ Download succeeded');
        
      } catch (error) {
            toast.error("Could not downoad this file");
      }
    };
    