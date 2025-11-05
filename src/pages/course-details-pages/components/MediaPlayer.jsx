import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import http from '../../../config/http';

const MediaPlayer = ({ content, onProgress, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [errorNotes, setErrorNotes] = useState(null);
  
  // Fetch notes when component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoadingNotes(true);
        const response = await http.get(`/content/${content.id}/notes`);
        setNotes(response.data || []);
      } catch (error) {
        console.error('Error loading notes:', error);
        setErrorNotes(error.message || 'Error loading notes');
      } finally {
        setLoadingNotes(false);
      }
    };
    
    if (content?.id) {
      fetchNotes();
    }
  }, [content?.id]);
  
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video?.currentTime);
      onProgress?.(video?.currentTime, video?.duration);
    };

    const handleLoadedMetadata = () => {
      setDuration(video?.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onComplete?.();
    };

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('loadedmetadata', handleLoadedMetadata);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onComplete]);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (isPlaying) {
      video?.pause();
    } else {
      video?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    const newTime = pos * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const addNote = async () => {
    if (newNote?.trim()) {
      try {
        setLoadingNotes(true);
        const resp = await http.post(`/content/${content.id}/notes`, {
          time: currentTime,
          content: newNote
        });
        const savedNote = resp.data;
        setNotes(prev => [...prev, savedNote]);
        setNewNote('');
        setErrorNotes(null);
      } catch (error) {
        console.error('Error saving note:', error);
        setErrorNotes(error.message);
      } finally {
        setLoadingNotes(false);
      }
    }
  };

  const jumpToNote = (time) => {
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef?.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden academic-shadow">
      <div 
        className="relative bg-black group"
        onMouseMove={showControlsTemporarily}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full aspect-video"
          src={content?.url}
          poster={content?.thumbnail}
          onClick={togglePlay}
        />

        {/* Video Controls Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div 
              className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-4"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-150"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                </Button>

                <div className="flex items-center gap-2">
                  <Icon name="Volume2" size={16} />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>

                <div className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Playback Speed */}
                <select
                  value={playbackRate}
                  onChange={(e) => handlePlaybackRateChange(parseFloat(e?.target?.value))}
                  className="bg-black/50 text-white border border-white/30 rounded px-2 py-1 text-sm"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNotes(!showNotes)}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="StickyNote" size={20} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="Maximize" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Notes Panel */}
      {showNotes && (
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Notas del Video</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotes(false)}
              iconName="X"
              iconPosition="left"
            >
              Cerrar
            </Button>
          </div>

          {/* Add Note */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Agregar nota en el tiempo actual..."
              value={newNote}
              onChange={(e) => setNewNote(e?.target?.value)}
              className="flex-1 p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              onKeyPress={(e) => e?.key === 'Enter' && addNote()}
            />
            <Button
              variant="default"
              onClick={addNote}
              iconName="Plus"
              iconPosition="left"
              disabled={!newNote?.trim()}
            >
              Agregar
            </Button>
          </div>

          {/* Notes List */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {notes?.map((note) => (
              <div key={note?.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <button
                  onClick={() => jumpToNote(note?.time)}
                  className="flex-shrink-0 text-primary hover:text-primary-foreground hover:bg-primary rounded px-2 py-1 text-sm font-medium transition-colors"
                >
                  {formatTime(note?.time)}
                </button>
                <p className="flex-1 text-foreground text-sm">{note?.content}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotes(notes?.filter(n => n?.id !== note?.id))}
                  className="flex-shrink-0"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            ))}
            {notes?.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No hay notas aún. Agrega una nota para recordar puntos importantes.
              </p>
            )}
          </div>
        </div>
      )}
      {/* Video Info */}
      <div className="p-4 border-t border-border">
        <h3 className="font-semibold text-foreground mb-2">{content?.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{content?.description}</p>
        
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={14} />
            <span>Duración: {formatTime(duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={14} />
            <span>{content?.views} visualizaciones</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Calendar" size={14} />
            <span>Publicado: {new Date(content.publishedAt)?.toLocaleDateString('es-ES')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;