import {Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm'
import {Profile} from './profile.entity'
import { Post } from 'src/posts/post.entity'
@Entity({name: 'users'})
export class User{
    //van a ser columnas
    @PrimaryGeneratedColumn()
    id: number
    //vamos a solicitar el username y solicitamos que sea unico
    @Column({unique: true})
    username: string
    @Column()
    password: string
    @Column({type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date
    @Column({nullable: true})
    authStrategy: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    //aca se hace la conexion con uno a muchos
    @OneToMany(()=>Post, post=> post.author)
    posts: Post[]


} 