import DeleteAdminButton from "../elements/DeleteAdminButton";


const AdminCart = ({admin}:any) => {

    const { email , _id } = admin;

    

    return (
        <div className="dark:bg-background-dark-3 bg-background-light-1 px-3 py-2 rounded-lg flex items-center justify-between" >
            <div className="flex items-center gap-x-3 text-sm md:text-base">
                <h3>ایمیل:</h3>
                <p dir="ltr">{email}</p>
            </div>
            <span><DeleteAdminButton _id={ _id }   /></span>
        </div>
    );
};

export default AdminCart;