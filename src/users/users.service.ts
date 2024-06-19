//importando las excepciones a tirar en vez de utilizar
//los conocidos numeros se utilizan los status
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './user.entity';
import { Repository } from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {CreateProfileDto} from './dto/create-profile.dto';
//para conectar con ORM y usar la ase de datos importamos lo que debe tener la tabla
import {Profile} from './profile.entity';

@Injectable()
export class UsersService {
    //tomamos la tabla que importamos de entity
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>

     ) {}
    // le metes al async asi le das tiempo a la base de datos
    // a que busque el usuario para poder tirar la excepcion
   

    async createUser(user: CreateUserDto){

        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if(userFound){
            return new HttpException('User alredy exist', HttpStatus.CONFLICT)
        }

        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
        
    }

    getUsers() {
        //esto que esta aca es propio de ORM 
        return this.userRepository.find({
            //cargamos uno a mucho con el tema de los posts y otro para la rerlacion
            //uno a uno donde tenemos el profile osea los datos de la persona
            relations: ['posts', 'profile']
        })
    }

    async getUser(id: number){
        const userFound = await this.userRepository.findOne({
            where: {
                id,
            },
            relations: ['posts']
        });

        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return userFound;
    
    }

    async deleteUser(id: number){
        const result = await this.userRepository.delete({id});
        if(result.affected===0){
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        return result;
    }

    async updateUser(id:number, user: UpdateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }


        const updateUser = Object.assign(userFound, user);
        return this.userRepository.save(updateUser)
    }

    async createProfile(id:number, profile: CreateProfileDto){
        const userFound = await this.userRepository.findOne(
            {
                where: {
                    id,
                }
            }
        )

        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        //creo el profile con los datos
        const newProfile = this.profileRepository.create(profile)
        //lo guardo en el repositorio
        const savedProfile = await this.profileRepository.save(newProfile)
        //asigno al usuario que encontro el profile que creaste y guardaste
        //simplemente estas guardando
        userFound.profile = savedProfile

        //finalmente guardo todo en el repositorio
        return this.userRepository.save(userFound)

    }





}
