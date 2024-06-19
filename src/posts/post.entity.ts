import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {User} from 'src/users/user.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    //creo que lo va a usar para algo pero no se bien para que
    @Column()
    authorId: number;

    //usamos usuario y le decimos con que columna de usuario se debe relacionar
    @ManyToOne(()=> User, user => user.posts)
    author: User
}