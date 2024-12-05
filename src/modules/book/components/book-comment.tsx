'use client';
import { Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { FC, useState } from 'react';

import ProductApi from '@/api/product-api';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useUserStore from '@/hooks/store/use-user-store';
import { Comment } from '@/types/comment';
import { getNameAbbreviation } from '@/utils/user-utils';

interface BookCommentProps {
  comment: Comment;
  bookId: number;
}

const BookComment: FC<BookCommentProps> = ({ comment, bookId }) => {
  const [likes, setLikes] = useState(comment.likesNumber);
  const [dislikes, setDislikes] = useState(comment.dislikesNumber);
  const [reacted, setReacted] = useState<string | null>(null);
  const { user } = useUserStore();

  const handleReviewRating = async (isLike: boolean) => {
    if (isLike) {
      if (reacted !== 'dislike') {
        setLikes((prev) => prev + (reacted === 'like' ? -1 : 1));
        setReacted(reacted === 'like' ? null : 'like');
      } else {
        setLikes((prev) => prev + 1);
        setDislikes((prev) => prev - 1);
        setReacted('like');
      }
      await ProductApi.likeComment(bookId, comment.id);
    } else {
      if (reacted !== 'like') {
        setDislikes((prev) => prev + (reacted === 'dislike' ? -1 : 1));
        setReacted(reacted === 'dislike' ? null : 'dislike');
      } else {
        setDislikes((prev) => prev + 1);
        setLikes((prev) => prev - 1);
        setReacted('dislike');
      }
      await ProductApi.dislikeComment(bookId, comment.id);
    }
  };

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback>
                {getNameAbbreviation(comment.userName)}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{comment.userName}</CardTitle>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                aria-label="Star"
                className={`h-4 w-4 ${
                  i < comment.rating
                    ? 'text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{comment.content}</p>
      </CardContent>
      {user && (
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReviewRating(true)}
              className="text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {likes}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReviewRating(false)}
              className="text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              {dislikes}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookComment;
