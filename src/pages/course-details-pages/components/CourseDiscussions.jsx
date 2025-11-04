import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CourseDiscussions = ({ discussions, onCreatePost, onReplyToPost }) => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [activeReply, setActiveReply] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} días`;

    return postDate?.toLocaleDateString('es-ES');
  };

  const handleCreatePost = () => {
    if (newPostTitle?.trim() && newPostContent?.trim()) {
      onCreatePost({
        title: newPostTitle,
        content: newPostContent
      });
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  const handleReply = (postId) => {
    if (replyContent?.trim()) {
      onReplyToPost(postId, replyContent);
      setReplyContent('');
      setActiveReply(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Discussion Header */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Foro de Discusión</h2>
            <p className="text-muted-foreground">Participa en conversaciones con tus compañeros y profesores</p>
          </div>
          <Button
            variant="default"
            onClick={() => setShowNewPost(!showNewPost)}
            iconName="Plus"
            iconPosition="left">

            Nueva Discusión
          </Button>
        </div>

        {/* Discussion Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="MessageSquare" size={18} className="text-primary" />
              <span className="font-medium text-foreground">Total Discusiones</span>
            </div>
            <div className="text-2xl font-bold text-primary">{discussions?.length}</div>
          </div>
          
          <div className="bg-success bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Users" size={18} className="text-success" />
              <span className="font-medium text-foreground">Participantes Activos</span>
            </div>
            <div className="text-2xl font-bold text-success">
              {new Set(discussions.flatMap((d) => [d.author.id, ...d.replies.map((r) => r.author.id)]))?.size}
            </div>
          </div>
          
          <div className="bg-warning bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="MessageCircle" size={18} className="text-warning" />
              <span className="font-medium text-foreground">Total Respuestas</span>
            </div>
            <div className="text-2xl font-bold text-warning">
              {discussions?.reduce((acc, d) => acc + d?.replies?.length, 0)}
            </div>
          </div>
        </div>
      </div>
      {/* New Post Form */}
      {showNewPost &&
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Crear Nueva Discusión</h3>
          <div className="space-y-4">
            <Input
            label="Título de la discusión"
            type="text"
            placeholder="Escribe un título descriptivo..."
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e?.target?.value)} />

            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contenido
              </label>
              <textarea
              className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={4}
              placeholder="Describe tu pregunta o tema de discusión..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e?.target?.value)} />

            </div>
            
            <div className="flex gap-3">
              <Button
              variant="default"
              onClick={handleCreatePost}
              iconName="Send"
              iconPosition="left"
              disabled={!newPostTitle?.trim() || !newPostContent?.trim()}>

                Publicar Discusión
              </Button>
              <Button
              variant="outline"
              onClick={() => setShowNewPost(false)}>

                Cancelar
              </Button>
            </div>
          </div>
        </div>
      }
      {/* Discussions List */}
      <div className="space-y-4">
        {discussions?.map((discussion) =>
        <div key={discussion?.id} className="bg-card border border-border rounded-lg academic-shadow">
            <div className="p-6">
              {/* Discussion Header */}
              <div className="flex items-start gap-4 mb-4">
                <Image
                src={discussion?.author?.avatar}
                alt={discussion?.author?.avatarAlt}
                className="w-10 h-10 rounded-full object-cover" />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{discussion?.title}</h3>
                    {discussion?.isPinned &&
                  <Icon name="Pin" size={16} className="text-warning" />
                  }
                    {discussion?.isResolved &&
                  <span className="px-2 py-1 bg-success bg-opacity-10 text-success text-xs font-medium rounded-full">
                        Resuelto
                      </span>
                  }
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{discussion?.author?.name}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(discussion?.createdAt)}</span>
                    <span>•</span>
                    <span>{discussion?.replies?.length} respuestas</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>

              {/* Discussion Content */}
              <div className="mb-4">
                <p className="text-foreground leading-relaxed">{discussion?.content}</p>
              </div>

              {/* Discussion Actions */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={16} />
                    <span className="text-sm">{discussion?.likes}</span>
                  </button>
                  <button
                  onClick={() => setActiveReply(activeReply === discussion?.id ? null : discussion?.id)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">

                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">Responder</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Eye" size={14} />
                  <span>{discussion?.views} vistas</span>
                </div>
              </div>

              {/* Reply Form */}
              {activeReply === discussion?.id &&
            <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex gap-3">
                    <Image
                  src="https://images.unsplash.com/photo-1555786337-3a8ac6da301c"
                  alt="Current user profile photo showing woman with long brown hair smiling at camera"
                  className="w-8 h-8 rounded-full object-cover" />

                    <div className="flex-1">
                      <textarea
                    className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={3}
                    placeholder="Escribe tu respuesta..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e?.target?.value)} />

                      <div className="flex gap-2 mt-2">
                        <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleReply(discussion?.id)}
                      iconName="Send"
                      iconPosition="left"
                      disabled={!replyContent?.trim()}>

                          Responder
                        </Button>
                        <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveReply(null)}>

                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
            }

              {/* Replies */}
              {discussion?.replies?.length > 0 &&
            <div className="mt-4 space-y-4">
                  <h4 className="font-medium text-foreground">Respuestas ({discussion?.replies?.length})</h4>
                  {discussion?.replies?.map((reply) =>
              <div key={reply?.id} className="flex gap-3 p-4 bg-muted rounded-lg">
                      <Image
                  src={reply?.author?.avatar}
                  alt={reply?.author?.avatarAlt}
                  className="w-8 h-8 rounded-full object-cover" />

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{reply?.author?.name}</span>
                          {reply?.author?.role === 'professor' &&
                    <span className="px-2 py-1 bg-primary bg-opacity-10 text-primary text-xs font-medium rounded-full">
                              Profesor
                            </span>
                    }
                          <span className="text-sm text-muted-foreground">
                            {formatTimeAgo(reply?.createdAt)}
                          </span>
                        </div>
                        <p className="text-foreground leading-relaxed">{reply?.content}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                            <Icon name="ThumbsUp" size={14} />
                            <span className="text-sm">{reply?.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
              )}
                </div>
            }
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default CourseDiscussions;