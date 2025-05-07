import { toast } from 'sonner';
import axios from "axios";

export const fetchDocDetails = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/content-info/${id}`);
        if (response.status === 200) {
          const { customMetadataMap = {}, ...rest } = response.data;
          const mergedData = { ...rest, ...customMetadataMap };
          toast.success("Details fetched successfully.");
          return mergedData;
        } 
        else {
          toast.error(`Unexpected response status: ${response.status}`);
        }
      } 
      catch (error) {
        if (error.response) {
          const status = error.response.status;
    
          toast.error(
            status === 404
              ? "Document not found (404)"
              : status === 401
              ? "Unauthorized access (401)"
              : `Server error (${status})`
          );
        } else if (error.request) {
          toast.error("No response from server. Check your network.");
        } else {
          toast.error("Error setting up the request.");
        }
      }
    };