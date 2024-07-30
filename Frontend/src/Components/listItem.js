import moment from 'moment';

function ListItem({item, viewItem}) {
    return (
        <>
        <div className="item-container flex flex-col h-24 border border-gray-400 mb-2 p-2 rounded-lg shadow">
            <div className="flex flex-row justify-between" onClick={viewItem}>
                <div className="flex flex-col">
                    <span className="font-bold text-lg mb-2">{item.title}</span>
                    <span className="text-sm truncate my-1">{item.description}</span>
                    {/* <span className="text-sm trucate">{moment(item.createdDate).format('DD MMM YYYY')}</span> */}
                </div>
                <span>
                    {item.currency === 'USD' && <i className="bi bi-currency-dollar"/>}
                    {item.currency === 'IND' && <i className="bi bi-currency-rupee"/>}
                    {(item.amount).toFixed(2)}
                </span>
            </div>
            <div className="flex flex-row"></div>
        </div>
        </>
    )
}

export default ListItem;