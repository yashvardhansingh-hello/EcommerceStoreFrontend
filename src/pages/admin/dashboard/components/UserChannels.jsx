import TitleCard from "../../components/Cards/TitleCard"

const userSourceData = [
    {source : "Facebook Ads", count : "26,345", conversionPercent : 10.2},
    {source : "Google Ads", count : "21,341", conversionPercent : 11.7},
    {source : "Instagram Ads", count : "34,379", conversionPercent : 12.4},
    {source : "Affiliates", count : "12,359", conversionPercent : 20.9},
    {source : "Organic", count : "10,345", conversionPercent : 10.3},
]

const UserChannels = ({title, data, head1, head2}) => {
    return(
        <TitleCard title={title}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">{head1}</th>
                        <th className="normal-case">{head2}</th>
                        {/* <th className="normal-case">Conversion</th> */}
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((u, k) => {
                                if(k > 0)
                                return(
                                    <tr key={k}>
                                        <th>{k}</th>
                                        <td>{u.name}</td>
                                        <td>{u.count}</td>
                                        {/* <td>{`${u.conversionPercent}%`}</td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels