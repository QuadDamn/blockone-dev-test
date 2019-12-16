import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LatestBlocksContainer from './LatestBlocksContainer';

configure({adapter: new Adapter()});

const axiosMockResponseData = {
    data: {
        latestBlocks: [
            {
                id: "05aa6138b8fc026619b54194e31c9b35b937968b7cb09f7e2fd17fbdcbf51b1f",
                timestamp: "2019-12-15T02:43:08.000",
                actionsCount: 98,
                rawJson: ""
            },
            {
                id: "05aa6137c51053d371b34a512b9c70d576f39fb1ebf20bcf702f6763793e98bf",
                timestamp: "2019-12-15T02:43:07.500",
                actionsCount: 474,
                rawJson: ""
            },
            {
                id: "05aa61363e37a27e86fa81efe9d284c9823261a3e0e102931b37d93a4727f37d",
                timestamp: "2019-12-15T02:43:07.000",
                actionsCount: 289,
                rawJson: ""
            }
        ]
    }
};

describe("Latest Blocks", () => {
    describe("on start", () => {
        const useEffect = jest.spyOn(React, "useEffect").mockImplementationOnce(f => f());

        const props = {
            fetchLatestBlocks: jest.fn().mockResolvedValue(axiosMockResponseData),
        };

        const wrapper = shallow(<LatestBlocksContainer {...props} />);

        it("loads the latest blocks", () => {
            expect(props.fetchLatestBlocks).toHaveBeenCalled();
        });

        it("renders the latest blocks", () => {
            expect(wrapper.find("Block")).toHaveLength(3);

            const firstBlock = wrapper.find("Block").first();

            expect(firstBlock.props().id).toEqual("05aa6138b8fc026619b54194e31c9b35b937968b7cb09f7e2fd17fbdcbf51b1f");
            expect(firstBlock.props().timestamp).toEqual("2019-12-15T02:43:08.000");
            expect(firstBlock.props().actionsCount).toEqual(98);
        });
    });

    describe("test refresh latest blocks button click", () => {
        it('should call mock function when button is clicked', () => {
            const fetchLatestBlocks = jest.fn();
            const component = shallow(
                <button id="refreshLatestBlocksButton"
                        className='btn btn-primary float-right'
                        onClick={fetchLatestBlocks}>Load Latest Blocks
                </button>
            );
            component.simulate('click');
            expect(fetchLatestBlocks).toHaveBeenCalled();
        });
    });
});