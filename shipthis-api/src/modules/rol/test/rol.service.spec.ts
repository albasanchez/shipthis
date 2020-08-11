import { Test, TestingModule } from '@nestjs/testing';
import { RolService } from '../rol.service';
import { RolRepository } from '../repositories/rol.repository';
import { RolMock, rolMockModuleMetadata } from './mocks/rol.mock';
import {
  RolNotFoundException,
} from '../../../common/exceptions';
import {BadRequestException } from '@nestjs/common';

describe('RolService', () => {
  let service: RolService;
  let repository: RolRepository;
  const rolMockRespository: RolMock = new RolMock();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      rolMockModuleMetadata,
    ).compile();
    repository = module.get<RolRepository>(RolRepository);
    service = module.get<RolService>(RolService);
  });

  describe('get', () => {
    it('should return specified rol', async () => {
      repository.findOne = rolMockRespository.findOne(true);
      const rolID = 4;
      await service.get(rolID);
      expect(repository.findOne).toHaveBeenCalled();
    });

    it('should return BadRequestException', async () => {
      const rolID = null;
      try{
        await service.get(rolID);
      }
      catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return RolNotFoundException', async () => {
      repository.findOne = rolMockRespository.findOne(false);
      const rolID = 4;
      try{
        await service.get(rolID);
      }
      catch(e){
        expect(e).toBeInstanceOf(RolNotFoundException);
      }
    });
  });

  describe('gelAll', () => {
    it('should return a list of all rols', async () => {
      repository.find = rolMockRespository.find();
      await service.gelAll();
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create rol', async () => {
      repository.save = rolMockRespository.save();
      const newRol: any = {
        name: 'NEW_ROL',
        users: []
      };
      await service.create(newRol);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update rol', async () => {
      repository.findOne = rolMockRespository.findOne(true);
      repository.update = rolMockRespository.update();
      const newRol: any = {
        name: 'NEW_ROL',
        users: []
      };
      const rolID = 4;
      await service.update(rolID, newRol);
      expect(repository.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete rol', async () => {
      repository.findOne = rolMockRespository.findOne(true);
      repository.delete = rolMockRespository.delete();
      const rolID = 4;
      await service.delete(rolID);
      expect(repository.delete).toHaveBeenCalled();
    });
  });

});
