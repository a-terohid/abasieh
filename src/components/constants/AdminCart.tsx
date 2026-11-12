import DeleteAdminButton from "../elements/DeleteAdminButton";


const AdminCart = ({admin}:any) => {

    const { email , _id } = admin;

    return (
        <div className="list-row" >
            <p className="min-w-0 flex-1 truncate ps-2 text-[0.9375rem] font-semibold"><span className="sr-only">ایمیل: </span><span dir="ltr">{email}</span></p>
            <span><DeleteAdminButton _id={ _id }   /></span>
        </div>
    );
};

export default AdminCart;
