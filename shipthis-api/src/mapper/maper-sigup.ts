import { GenderType } from './../modules/userdata/constants/gender.enum';
import { SocialNetDto, SignupDto } from 'src/modules/auth/dto';

export class MapperSignupDto {
  static SignuoDtoFromSocialNetDto(socialData: SocialNetDto): SignupDto {
    const signup: SignupDto = new SignupDto();
    signup.useremail = socialData.useremail;
    signup.first_name = socialData.first_name;
    signup.last_name = socialData.last_name;
    signup.picture_url = socialData.picture_url;
    signup.def_language = socialData.def_language;
    signup.gender = GenderType.OTHER;
    signup.receive_notifications = true;
    return signup;
  }
}
