import { Card, Row, Col, Image } from 'react-bootstrap';
import config from "../../config.json";
import {
    Heading2,
    Heading3,
} from '../ToolBox/Headings';
import {
    ParagraphStd,
} from '../ToolBox/Paragraphs';
import React, { useEffect, useState } from 'react';
import { create } from 'apisauce';

const apiBaseUrl = 'http://localhost:3000/api_blog';
const api = create({
    baseURL: apiBaseUrl,
});

const FeaturedUpdate = ({ article }: any) => {
    const [imageURL, setImageURL] = useState<string>('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYbW9VZlllc2pkS0Y3RXBDWG9FZDVYRERoeThRR2R4UGxLV2ZDN2NhR2JZIn0.eyJleHAiOjE3MDUyMTYzNjAsImlhdCI6MTcwNTE4MDM2MCwianRpIjoiNjZhZTI0MmQtYzE4YS00ODE4LTk2OWUtOTFmZGU5MzAyZTA1IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9pbnRyYW5ldCIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI5NGY4ZGNlMC02MDMyLTRhOTgtYmNmMy05ZGQ0NmQwYmQ5MDkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpbnRyYW5ldC1iYWNrIiwic2Vzc2lvbl9zdGF0ZSI6ImQ4YThlMmM0LWMzOWQtNDMwNi05MDRhLTQ1ZGQzZjk2NzZmMyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MDA5IiwiaHR0cHM6Ly9hcGkuZGFwaS1zZXJ2aWNlcy5mciJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsic3R1ZGVudCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWludHJhbmV0Il19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InJvbGVzIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJkOGE4ZTJjNC1jMzlkLTQzMDYtOTA0YS00NWRkM2Y5Njc2ZjMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJaYWthcmlhIFJBSkkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ6YWthcmlhIiwiZ2l2ZW5fbmFtZSI6Ilpha2FyaWEiLCJsb2NhbGUiOiJlbiIsImZhbWlseV9uYW1lIjoiUkFKSSIsImFkZV9saW5rIjoiVjNMRGpkM0Euc2h1IiwiZ3JvdXAiOlsiL2V4dGVybmFsIiwiL3N0dWRlbnQiXX0.LnjVEGuV_QrmRxqmwIsxmUqMJlP4i1hdwB19zTEJqelcCAuyXclTIxAKiO9-qyZG_-Wdk-KaouFx5TizkuOO8wOyMkPqDwDO3-xvDAqm_ebCirHKqwFuiMvS1zOoCiM6faPeiSB3Cq0AYl1X35LpBTeNM7ZTOrhICbnHlinXgztLibfbHL7rcuR0AS8bHs0CKPNbuhEizD_Kcm8hFdDbVekVrE3hD9PFHq4HusXDQJsP_U8ELQMa3zpozqrIrSjrRcqrNUA0PYxpKdY0bVks6hcMNglifDoO8q-8OC44iHS-BGUoeHA_JIsYAbr7KdA6GfQmY71tQcwOGYRU5Gj5YA'; // Replace with your actual token

                const response = await api.get(
                    `/uploads/94f8dce0-6032-4a98-bcf3-9dd46d0bd909/publicFiles/1705180836379_d8jgwg.png`,
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        responseType: 'blob', // Specify the response type as 'blob' for file download
                    }
                );

                if (response.ok && response.data instanceof Blob) {
                    const imageBlob = new Blob([response.data], {
                        type: response.headers?.['content-type'] || 'application/blob',
                        // Use optional chaining to avoid the error if 'headers' is undefined
                    });
                    const url = URL.createObjectURL(imageBlob);
                    setImageURL(url);
                } else {
                    console.error('Error fetching image:', response.problem);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, []); // Empty dependency array means the effect runs once on mount

    return (
        <div>
            {imageURL ? (
                <img src={imageURL} alt="Fetched Image" />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};


export default FeaturedUpdate;
