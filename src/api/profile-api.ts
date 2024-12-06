import api from '@/lib/api';

class ProfileAPI {
  async changePassword(password: string) {
    return await api.patch('/users/me', {
      body: { password },
      withCredentials: true,
    });
  }

  async changeName(name: string) {
    return await api.patch('/users/me', {
      body: { name },
      withCredentials: true,
    });
  }

  async logout() {
    return await api.post('/auth/logout', {
      withCredentials: true,
    });
  }

  async deleteProfile() {
    return await api.delete('/users/me', {
      withCredentials: true,
    });
  }
}

export default new ProfileAPI();
