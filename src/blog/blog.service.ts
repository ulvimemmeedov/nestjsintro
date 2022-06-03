import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';


@Injectable()
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel:Model<Post>){};
 
    async getPosts() : Promise<Post[]> {
        return await this
        .postModel
        .find()
        .exec();
    }
    async getPost(postID : string) : Promise<Post> {
        return await this
        .postModel
        .findById(postID)
        .exec();
    }
    async addPost(createPostDTO : CreatePostDTO) : Promise<Post>{
        const newPost : Post = await this
        .postModel
        .create(createPostDTO);
        return newPost;
    }
    async editPost(postID : string, createPostDTO: CreatePostDTO) : Promise<Post> {
        const editedPost : Post = await this
        .postModel
        .findByIdAndUpdate(postID,createPostDTO)
        return editedPost
    }
    async deletePost(postID : string) : Promise<Post> {
        const deletedPost : Post = await this
        .postModel
        .findByIdAndDelete(postID);
        return deletedPost;
    }
}
