'use client';

import { useEffect, useState } from 'react';
import { Share, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SocialShareProps {
  title: string;
  url?: string;
  description?: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Set current URL in client-side
    setCurrentUrl(url || window.location.href);
  }, [url]);
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedDescription = encodeURIComponent(description || '');
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium mb-2">Chia sẻ</div>
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => window.open(shareLinks.facebook, '_blank')}
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Facebook</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => window.open(shareLinks.twitter, '_blank')}
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Twitter</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => window.open(shareLinks.linkedin, '_blank')}
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={copyToClipboard}
                aria-label="Copy link"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? 'Đã sao chép!' : 'Sao chép liên kết'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
} 