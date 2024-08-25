import {
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string = 'none';

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
