import './RewardLeft.css';
const DistPayoutTooltip = (props) => {
    const { children } = props;

    return (
        <div className="distpayouttooltip">
            {children}
            <div className="distpayouttooltip_content">
                <p className='distpayout_text'>This button distributes any available cycle reward payouts to all users.  There is no reward for calling this function.</p>
            </div>
        </div>
    );
};

export default DistPayoutTooltip;