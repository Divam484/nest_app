import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})
export class User {

    @Prop({ required: true, unique: true})
    email:string;

    @Prop({ required: true})
    password:string;

    @Prop()
    profile:string;

    @Prop({ default: false })
    isAdmin:boolean;

}

export const UserSchema = SchemaFactory.createForClass(User)