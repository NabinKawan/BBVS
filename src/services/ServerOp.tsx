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

const { apiUrl } = getConfig().publicRuntimeConfig;
console.log({ apiUrl: apiUrl });

export default class ServerOp {
  static async getAllCandidates(accessToken: string) {
    console.log({ token: accessToken });
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/candidates`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response);
      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        const candidates = (await response.json()) as CandidateResponseDto;
        // console.log(candidates);
        return candidates;
      } else if (response.status === 403) {
        return 'unauthorized';
      }
    } catch (e) {
      throw e;
    }
  }

  static async uploadImage(file: any) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // console.log(body);
      try {
        // const response = await fetch('http://localhost:5000/api/file/uploadImage', {
        //   body,
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   method: 'POST',
        // });
        const response = await axios.post(
          // `${minterUrl}/policies?request=${JSON.stringify(request)}`,
          'http://localhost:5000/api/file/uploadImage',
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
              accept: 'application/json',
            },
          },
        );

        console.log(response);
        if (response.status === 200) {
          console.log('succcess');
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/candidates/addCandidate`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(candidate),
      });

      console.log(response);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/candidates/updateCandidate`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(candidate),
      });

      console.log(response);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(
        `${'http://localhost:5000/api'}/candidates/deleteCandidate/${candidateId}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(response);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/voters`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response);
      if (response.status === 200) {
        // throw Error(`Unexpected response: code [${response.status}]`);
        const voters = (await response.json()) as VoterResponseDto;
        // console.log(candidates);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/voters/addVoter`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(voter),
      });

      console.log(response);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/voters/${voter_id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('profile');
      console.log(response);
      if (response.status === 200) {
        const voter = await response.json();
        console.log(voter);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/voters/updateVoter`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(voter),
      });

      console.log(response);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/voters/deleteVoter/${voterId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/admin/${adminId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('profile');
      console.log(response);
      if (response.status === 200) {
        const admin = await response.json();
        console.log(admin);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(
        `${'http://localhost:5000/api'}/admin/adminCredential/${adminId}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(response);
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
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/login/adminLogin`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(adminCredential),
      });

      console.log(response);
      if (response.status === 200) {
        const jwtToken = await response.json();
        console.log(jwtToken);
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
    console.log(voterCredential);
    // console.log('iden', JSON.stringify(identifiers));
    try {
      const response = await fetch(`${'http://localhost:5000/api'}/login`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(voterCredential),
      });

      console.log(response);
      if (response.status === 200) {
        const jwtToken = await response.json();
        console.log(jwtToken);
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
}
