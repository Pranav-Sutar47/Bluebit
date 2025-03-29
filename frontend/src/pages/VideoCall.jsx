import React, { useContext, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Video, Phone, PhoneOff, Link, Copy, Share2 } from "lucide-react";
import AppContext from "@/context/AppContext";

const VideoCall = () => {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [callFrame, setCallFrame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const { toast } = useToast();

  const {url,setUrl} = useContext(AppContext);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      setLinkCopied(true);
      toast({
        description: "Meeting link copied to clipboard!",
        className: "bg-teal-600 text-white",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const startCall = async () => {
    setIsLoading(true);
    try {
      const url = String(import.meta.env.VITE_BASEURL) + 'auth/create-meeting/';
      const response = await axios.get(url);

      if (!response.data.url) {
        toast({
          description: "Error: No meeting URL received.",
          className: "bg-red-500 text-white",
        });
        setIsLoading(false);
        return;
      }

      setMeetingUrl(response.data.url);

      setUrl(response.data.url);

      toast({
        description: (
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Meeting created successfully!</p>
            <div className="flex items-center gap-2 text-sm">
              <Link size={14} />
              <a href={response.data.url} className="text-blue-300 underline truncate max-w-xs">
                {response.data.url}
              </a>
            </div>
          </div>
        ),
        className: "bg-green-600 text-white",
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast({
        description: "Failed to create meeting. Please try again.",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const joinCall = () => {
    // Create Daily.co iframe
    const frame = DailyIframe.createFrame({
      iframeStyle: {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: "0",
        left: "0",
        zIndex: "1000",
        border: "none",
      },
      showLeaveButton: true,
    });

    frame.join({ url: meetingUrl });
    setCallFrame(frame);
    setLinkCopied(false); // Reset copied state for next time
  };

  const leaveCall = () => {
    if (callFrame) {
      callFrame.destroy();
      setCallFrame(null);
      setMeetingUrl("");
      setLinkCopied(false);
      toast({
        description: "You've left the video call",
        className: "bg-blue-600 text-white",
      });
    }
  };

  return (
    <div className="font-[Work-Sans] flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-cyan-400 text-white p-6">
      <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden p-8 border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center">Video Consultation</h2>
        
        {!meetingUrl && !callFrame && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-cyan-600/30 rounded-full flex items-center justify-center border-4 border-cyan-500/50">
                <Video size={40} className="text-white" />
              </div>
            </div>
            
            <button
              onClick={startCall}
              disabled={isLoading}
              className={`w-full py-3 px-4 flex items-center justify-center gap-2 rounded-lg font-medium transition-all ${
                isLoading
                  ? "bg-cyan-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 active:from-cyan-700 active:to-teal-700"
              } shadow-lg`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating meeting...</span>
                </div>
              ) : (
                <>
                  <Phone size={18} />
                  <span>Start Video Call</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Meeting Link Sharing Section - When meeting URL exists but call hasn't started */}
        {meetingUrl && !callFrame && (
          <div className="mt-6 relative">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Share2 size={12} />
              <span>Share Meeting</span>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg border border-purple-300/30 w-full shadow-inner">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-white">Invite participants:</span>
                <button 
                  onClick={copyToClipboard}
                  className="text-xs bg-white/20 hover:bg-white/30 p-2 rounded-md transition-colors flex items-center gap-1 group"
                >
                  <Copy size={14} className="group-hover:scale-110 transition-transform" />
                  <span>Copy</span>
                </button>
              </div>
              
              <div className="p-3 bg-black/20 rounded-md flex items-center border border-white/10 backdrop-blur-sm group relative overflow-hidden">
                <a 
                  href={meetingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm break-all text-blue-200 group-hover:text-blue-100 underline underline-offset-2 truncate"
                >
                  {meetingUrl}
                </a>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-purple-500/20 to-transparent"></div>
              </div>
              
              <div className="mt-3 text-xs text-white/70 flex items-center gap-1">
                <Link size={12} />
                <span>Link expires after the meeting ends</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={joinCall}
                disabled={!linkCopied}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg ${
                  linkCopied 
                    ? "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600" 
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                <Phone size={18} />
                <span>{linkCopied ? "Join Call Now" : "Copy link to join"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Show "End Call" button only when the call is active */}
        {callFrame && (
          <div className="flex flex-col items-center space-y-4 mt-6">
            <p className="text-center text-sm opacity-80 mb-2">Your video call is currently active</p>
            <button
              onClick={leaveCall}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
            >
              <PhoneOff size={18} />
              <span>End Call</span>
            </button>
          </div>
        )}
      </div>
      
      <p className="mt-8 text-sm text-center text-white/70 max-w-md flex items-center justify-center gap-2 font-medium">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Secure, encrypted video consultations. Your privacy is our priority.
      </p>
    </div>
  );
};

export default VideoCall;

