import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {

    //vamos a utilizar los metodos de la clase que se crearon en user
    // es re villero eso igual
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private usersService: UsersService
    ){}

    //title, content, authorId:
    async createPost(post: CreatePostDto) {
        const userFound = await this.usersService.getUser(post.authorId);
        if(!userFound) return new HttpException('User not found', HttpStatus.NOT_FOUND);

        const newPost = this.postRepository.create(post);
        return this.postRepository.save(newPost);
    }
    
    //vamos a ver con que otra tabla la puedo relacionar
    getPost() {
        return this.postRepository.find({
            relations: ['author'],
        })
    }


}
