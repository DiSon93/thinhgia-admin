import auth from '../vuex/auth';
import customers from '~/vuex/customers';
import staffs from '../vuex/staffs';
import global from '../vuex/global';
import role from '../vuex/role';
import dictionaries from '../vuex/dictionaries';
import demand from '~/vuex/demand';
import projects from '~/vuex/projects';

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
    }

}