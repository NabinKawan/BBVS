import getConfig from 'next/config';

import axios from 'axios';
import Swal from 'sweetalert2';
import {
  AdminCredentialDto,
  AdminDto,
  CandidateDto,
  CandidateResponseDto,
  VoterCredentialDto,
  VoterDto,
  VoterResponseDto,
} from '../models/dto/ServerOpDtos';
import environments from '../configs/environments';

export default class ServerOp {
  static async getAllCandidates(accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/candidates`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        const candidates = (await response.json()) as CandidateResponseDto;
        //
        return candidates;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  static async uploadImage(file: any, accessToken: string) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      //
      try {
        // const response = await fetch('https://bbvs-api.herokuapp.com/api/file/uploadImage', {
        //   body,
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   method: 'POST',
        // });
        const response = await axios.post(
          // `${minterUrl}/policies?request=${JSON.stringify(request)}`,
          `${environments.BBVS_API_URL}/file/uploadImage`,
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
              accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.status === 200) {
          const img_url = await response.data;
          return img_url;
        } else if (response.status === 403) {
          return 'unauthorized';
        }
      } catch (e) {
        throw e;
      }
    } else {
      return '';
    }
  }

  static async uploadLogo(file: any, accessToken: string) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      //
      try {
        // const response = await fetch('https://bbvs-api.herokuapp.com/api/file/uploadImage', {
        //   body,
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   method: 'POST',
        // });
        const response = await axios.post(
          // `${minterUrl}/policies?request=${JSON.stringify(request)}`,
          `${environments.BBVS_API_URL}/file/uploadImage`,
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
              accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.status === 200) {
          const img_url = await response.data;
          return img_url;
        } else if (response.status === 403) {
          return 'unauthorized';
        }
      } catch (e) {
        throw e;
      }
    } else {
      return '';
    }
  }

  // returns true if success
  static async addCandidate(candidate: CandidateDto, accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/candidates/addCandidate`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(candidate),
      });

      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        return true;
      } else if (response.status === 403) {
        return 'unauthorized';
      } else if (response.status === 409) {
        Swal.fire({
          icon: 'error',
          text: 'Candidate already exist!!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  // returns true if success
  static async updateCandidate(candidate: CandidateDto, accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/candidates/updateCandidate`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(candidate),
      });

      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        return true;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  // returns true if success
  static async deleteCandidate(candidateId: string, accessToken: string) {
    //
    try {
      const response = await fetch(
        `${environments.BBVS_API_URL}/candidates/deleteCandidate/${candidateId}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        return true;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  static async getAllVoters(accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/voters`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        const voters = (await response.json()) as VoterResponseDto;
        //
        return voters;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  // returns true if success
  static async addVoter(voter: VoterDto, accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/voters/addVoter`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(voter),
      });

      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        return true;
      } else if (response.status === 403) {
        return 'unauthorized';
      } else if (response.status === 409) {
        Swal.fire({
          icon: 'warning',
          text: 'Voter already exist!!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  // returns admin  if success
  static async getVoter(voter_id: string, accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/voters/${voter_id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const voter = await response.json();

        // throw Error(`Unexpected response: code [${response.status}]`);
        return voter.content;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  // returns true if success
  static async updateVoter(voter: VoterDto, accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/voters/updateVoter`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(voter),
      });

      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        return true;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  // returns true if success
  static async deleteVoter(voterId: string, accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/voters/deleteVoter/${voterId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        return true;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  // returns admin  if success
  static async getAdmin(adminId: string, accessToken: string) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/admin/${adminId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const admin = await response.json();

        // throw Error(`Unexpected response: code [${response.status}]`);
        return admin;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  // returns admin credential if success
  static async getAdminCredential(adminId: string, accessToken: string) {
    //
    try {
      const response = await fetch(
        `${environments.BBVS_API_URL}/admin/adminCredential/${adminId}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 200) {
        const adminCredential = (await response.json()) as AdminCredentialDto;
        // throw Error(`Unexpected response: code [${response.status}]`);
        return adminCredential;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  static async adminLogin(adminCredential: AdminCredentialDto) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/login/adminLogin`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(adminCredential),
      });

      if (response.status === 200) {
        const jwtToken = await response.json();

        // throw Error(`Unexpected response: code [${response.status}]`);
        return jwtToken.access_token;
      } else if (response.status === 401) {
        Swal.fire({
          icon: 'warning',
          text: 'id or password incorrect',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  static async login(voterCredential: VoterCredentialDto) {
    //
    try {
      const response = await fetch(`${environments.BBVS_API_URL}/login`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(voterCredential),
      });

      if (response.status === 200) {
        const jwtToken = await response.json();

        return jwtToken.access_token;
      } else if (response.status === 401) {
        throw new Error('Incorrect credentials (id or password incorrect)');
      }
    } catch (e) {
      throw e;
    }
  }
}
