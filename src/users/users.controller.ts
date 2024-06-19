import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './user.entity'
import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
// al decir el controlador user
// nos va a indicar con la barra que
//tiene /user
@Controller('users')
export class UsersController {

    //es necesario crear un constructor
    constructor(private usersService:  UsersService){}

    @Post() 
    createUser(@Body() newUser: CreateUserDto) {
  
        return this.usersService.createUser(newUser);
    }

 
    @Get()
    getUser():  Promise<User[]>{
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUsers(@Param('id', ParseIntPipe)id:number){
        console.log("entro aca");

        return this.usersService.getUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        //devukeve las filas eliminada
        return this.usersService.deleteUser(id)
    }

    @Patch (':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body()
    user: UpdateUserDto){
        return this.usersService.updateUser(id, user)

    }


  

    //http://localhost:3000/users/7/profile
    @Post(':id/profile')
    CreateProfile(
        @Param('id', ParseIntPipe) id:number,
        @Body() profile: CreateProfileDto
    ){
        return this.usersService.createProfile(id, profile)
    }


   
}

