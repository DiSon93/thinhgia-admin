import auth from '../vuex/auth';
import customers from '~/vuex/customers';
import staffs from '../vuex/staffs';
import global from '../vuex/global';
import role from '../vuex/role';
import dictionaries from '../vuex/dictionaries';
import demand from '~/vuex/demand';
import projects from '~/vuex/projects';
import realEstate from '~/vuex/realEstate';
import blog from '../vuex/blog';
import homepage from '../vuex/homepage';
import contact from '~/vuex/contact';
import web from '~/vuex/web';

export default {
    modules:{
        auth,
        customers,
        staffs,
        global,
        role,
        dictionaries,
        demand,
        projects,
        realEstate,
        blog,
        homepage,
        contact,
        web
    }

}