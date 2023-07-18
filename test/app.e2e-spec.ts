import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let jwt: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    jwt = app.get(JwtService);

    await app.init();
  });

  beforeAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.conversation.deleteMany({});
    await prisma.supervisor.deleteMany({});

    const hash = async (data: string) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(data, salt);
    };

    const user = await prisma.user.create({
      data: {
        nationalCode: '123456789',
        email: 'aa@gmail.com',
        password: await hash('12345678'),
        role: 'admin',
      },
    });

    token = await jwt.signAsync({
      id: user.id,
      role: user.role,
    });

    const supervisor = await prisma.supervisor.create({
      data: {
        name: 'John Doe',
        email: 'test@ibm.ut',
        phone: '9895236522',
        googleScholar: 'link',
        students: { connect: { id: user.id } },
      },
    });

    await prisma.conversation.create({
      data: {
        student: {
          connect: { id: user.id },
        },
        supervisor: {
          connect: { id: supervisor.id },
        },
        title: 'test Conversion',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.conversation.deleteMany({});
    await prisma.supervisor.deleteMany();

    await app.close();
  });

  it('login user', async () => {
    const input = {
      nationalCode: '123456789',
      password: '12345678',
    };

    const mutation = `mutation {
      login(loginInput:{
        nationalCode: "${input.nationalCode}",
        password:"${input.password}"
      }) {
        access_token
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data.login.access_token).toBeDefined();
  });

  it('get All Graduate Students', async () => {
    await prisma.user.createMany({
      data: [
        {
          nationalCode: '1232456789',
          email: 'sa@gmail.com',
          status: 'graduated',
        },
        {
          nationalCode: '12232456789',
          email: 'ssa@gmail.com',
          status: 'graduated',
        },
      ],
    });

    const query = `query {
      getAllGraduateStudents {
        id
        email
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);
    const { data } = response.body;
    expect(Array.isArray(data?.getAllGraduateStudents)).toBe(true);
  });

  it('get All Dismissed Students', async () => {
    await prisma.user.createMany({
      data: [
        {
          nationalCode: '1232sss456789',
          email: 'saa2aas@gmail.com',
          status: 'dismissal',
        },
        {
          nationalCode: '122324a56789',
          email: 'ssaaa@gmail.com',
          status: 'dismissal',
        },
      ],
    });

    const query = `query {
      getAllDismissedStudents {
        id
        email
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);
    const { data } = response.body;
    expect(Array.isArray(data.getAllDismissedStudents)).toBe(true);
  });

  it('get supervisor by id', async () => {
    const supervisor = await prisma.supervisor.create({
      data: {
        name: 'John sDoe',
        email: 'twest@ibm.ut',
        phone: '989523s6522',
        googleScholar: 'lisnk',
      },
    });

    const query = `query {
      supervisor(id: ${supervisor.id}) {
        id
        name
        email
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);
    expect(response.body.data.supervisor.id).toBe(supervisor.id);
  });

  it('get my conversations', async () => {
    const query = `query {
      getMyConversations {
        id 
        title
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data.getMyConversations)).toBe(true);
  });

  it('complete profile', async () => {
    const mutation = `mutation {
      completeProfile(completeProfileInput: {
        fatherName: "father"
        marital: false
        BirthDay: "2023-07-18T14:46:10Z"
        address: "new york"
        phone: "+1985154"
        fieldOfStudy: "computer"
        orientation: "test"
        enteringYear: 2022
        beforeUniversity: "aut"
        dissertationTopic: "test"
        numberOfArticls: 2
      }){
        id
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query: mutation });

    expect(response.status).toBe(200);
  });

  
});
