import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const createddPokemon = await this.pokemonModel.create(createPokemonDto);
      return createddPokemon;
    } catch (error) {
      console.log(error);
      this.handleException(error);
    }
  }

  findAll() {
    return this.pokemonModel.find().exec();
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null;

    if (!isNaN(+term)) {
      // Search by Pokemon number
      pokemon = await this.pokemonModel.findOne({ no: term }).exec();
    } else if (isValidObjectId(term)) {
      // Search by MongoDB ObjectId (24 character hex string)
      pokemon = await this.pokemonModel.findById(term).exec();
    } else {
      // Search by Pokemon name
      pokemon = await this.pokemonModel
        .findOne({ name: term.toLowerCase() })
        .exec();
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name, or number "${term}" not found`,
      );
    }
    return pokemon;
  }
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      const updatedPokemon = await this.pokemonModel.findByIdAndUpdate(
        pokemon._id,
        updatePokemonDto,
        { new: true },
      );
      return updatedPokemon;
    } catch (error) {
      console.log(error);
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const pokemon = await this.findOne(id);
    await pokemon.deleteOne();
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      'Can´t create Pokemon - check server logs',
    );
  }
}
