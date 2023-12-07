function SoldItem({d,index}) {
    const {title,location,name,email,amount} = d
    return (
        <>
            <tr>
                <th>{index+1}</th>
                <td>{title}</td>
                <td>{location}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{amount}</td>
            </tr>
        </>
    );
}

export default SoldItem;