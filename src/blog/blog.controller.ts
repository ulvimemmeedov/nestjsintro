import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete, Version } from '@nestjs/common';
import { Result } from 'src/utils/results/Result';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post as PostInterface } from './interfaces/post.interface';
import { ResultInterface } from 'src/utils/results/result.interface';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {    
    constructor(private blogService: BlogService) { }

    @Get('posts')
    async getPosts(@Res() res): Promise<any> {
        const posts: PostInterface[] = await this
            .blogService
            .getPosts();

        const result: ResultInterface = {
            success: true,
            result: posts,
            max: posts.length
        }
        return res
            .status(HttpStatus.OK)
            .json(new Result(result));
    }

    @Get('post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID : string): Promise<any> {
        const post = await this
            .blogService
            .getPost(postID);

        if (!post) throw new NotFoundException('Post does not exist!');
        const result: ResultInterface = {
            success: true,
            result: post
        }
        return res
            .status(HttpStatus.OK)
            .json(new Result(result));

    }

    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO): Promise<any> {
        const newPost: PostInterface = await this.blogService.addPost(createPostDTO);
        const result: ResultInterface = {
            success: true,
            message: "Post has been submitted successfully!",
            result: newPost
        }
        return res
            .status(HttpStatus.OK)
            .json(new Result(result));
    }

    @Put('/edit')
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID : string,
        @Body() createPostDTO: CreatePostDTO
    ) : Promise <any> {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        
        if (!editedPost) throw new NotFoundException('Post does not exist!');

        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }

    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID : string) : Promise <any> {
        const deletedPost : PostInterface = await this
        .blogService
        .deletePost(postID);

        if (!deletedPost) throw new NotFoundException('Post does not exist!');

        let result: ResultInterface = {
            success : true,
            message : 'Post has been deleted!',
            result  : deletedPost
        }
        return res.status(HttpStatus.OK).json(new Result(result))
    }
}
