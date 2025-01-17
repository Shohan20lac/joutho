export const recordVoiceMessage = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];
  
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
  
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
      setVoiceMessages((prev) => [...prev, { sender: talkingPillowState, audio: audioBlob }]);
    };
  
    mediaRecorder.start();
  
    // Stop recording after 5 seconds (or add manual stop logic)
    setTimeout(() => mediaRecorder.stop(), 5000);
  };