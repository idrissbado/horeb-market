import { Adapter, AdapterUser, AdapterSession, AdapterAccount } from 'next-auth/adapters';
import { clientPromise } from './mongodb-adapter';
import { ObjectId } from 'mongodb';

export const MongoDBAdapter: Adapter = {
  async createUser(data: Omit<AdapterUser, 'id'>) {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      id: user.insertedId.toString(),
      ...data,
      emailVerified: null,
    };
  },

  async getUser(id: string) {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) return null;
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
    };
  },

  async getUserByEmail(email: string) {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ email });
    if (!user) return null;
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
    };
  },

  async getUserByAccount({ providerAccountId, provider }: { providerAccountId: string; provider: string }) {
    const client = await clientPromise;
    const db = client.db();
    const account = await db.collection('accounts').findOne({
      providerAccountId,
      provider,
    });
    if (!account) return null;
    const user = await db.collection('users').findOne({ _id: new ObjectId(account.userId) });
    if (!user) return null;
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
    };
  },

  async updateUser(data: Partial<AdapterUser> & Pick<AdapterUser, 'id'>) {
    const client = await clientPromise;
    const db = client.db();
    const { id, ...updateData } = data;
    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    return {
      id,
      ...updateData,
    } as AdapterUser;
  },

  async deleteUser(userId: string) {
    const client = await clientPromise;
    const db = client.db();
    await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
    await db.collection('accounts').deleteMany({ userId });
    await db.collection('sessions').deleteMany({ userId });
  },

  async linkAccount(data: AdapterAccount) {
    const client = await clientPromise;
    const db = client.db();
    await db.collection('accounts').insertOne({
      ...data,
      userId: new ObjectId(data.userId),
    });
    return data;
  },

  async unlinkAccount({ providerAccountId, provider }: { providerAccountId: string; provider: string }) {
    const client = await clientPromise;
    const db = client.db();
    await db.collection('accounts').deleteOne({
      providerAccountId,
      provider,
    });
  },

  async createSession(data: Omit<AdapterSession, 'id'>) {
    const client = await clientPromise;
    const db = client.db();
    const session = await db.collection('sessions').insertOne({
      ...data,
      userId: new ObjectId(data.userId),
      expires: new Date(data.expires),
    });
    return {
      id: session.insertedId.toString(),
      ...data,
    };
  },

  async getSessionAndUser(sessionToken: string) {
    const client = await clientPromise;
    const db = client.db();
    const session = await db.collection('sessions').findOne({ sessionToken });
    if (!session) return null;
    const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });
    if (!user) return null;
    return {
      session: {
        id: session._id.toString(),
        sessionToken: session.sessionToken,
        userId: session.userId.toString(),
        expires: session.expires,
      },
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
      },
    };
  },

  async updateSession(data: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>) {
    const client = await clientPromise;
    const db = client.db();
    const { sessionToken, ...updateData } = data;
    if (updateData.expires) {
      await db.collection('sessions').updateOne(
        { sessionToken },
        { $set: { ...updateData, expires: new Date(updateData.expires) } }
      );
    } else {
      await db.collection('sessions').updateOne(
        { sessionToken },
        { $set: updateData }
      );
    }
    return {
      sessionToken,
      ...updateData,
    } as AdapterSession;
  },

  async deleteSession(sessionToken: string) {
    const client = await clientPromise;
    const db = client.db();
    await db.collection('sessions').deleteOne({ sessionToken });
  },
}; 