import { useEffect, useState } from "react";
import { operators, suggestions } from "./suggestions";

const LabelsFilter = () => {
    const [globalLabels, setGlobalLabels] = useState([]);
    const [labelList, setLabelList] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [showFilterOptions, setShowFilterOptions] = useState(true);

    useEffect(() => {
        setLabelList([]);
        setGlobalLabels(suggestions)
    }, []);


    const handleAddFormula = (value) => {
        const array = [...labelList, value]
        setInputValue("");
        setLabelList(array);
    };
    const handleRemoveLabel = (item) => {
        const newList = labelList.filter((val) => val !== item);
        setLabelList(newList);
    };

    const handleBackspace = (event) => {
        if (
            event.code === "Backspace" &&
            labelList.length > 0 &&
            inputValue.length <= 0
        ) {
            setLabelList((prevArr) => {
                return prevArr.slice(0, -1);
              });
        }
    };

    const handleInputBlur = () => {
        setTimeout(() => setShowFilterOptions(false), 300);
    };

    const handleFilter = (event) => {
        setInputValue(event.target.value);
        if (event.target.value.length <= 0) return;
        if (event.target.value.slice(-1) === " ") {
            if (event.target.value.trim().length <= 0) {
                setInputValue("");
                return;
            }
            setInputValue("");
            handleAddFormula(event.target.value);
        }
        let formula;
        const searchWord = event.target.value;
        console.log("searchword: ", searchWord)
        if(operators.includes(searchWord.trim())){
            console.log("--> in operators")
            formula = [...globalLabels, searchWord]
        }else{
            let re = new RegExp(searchWord, "i");
            const newFilter = globalLabels.filter((value) => {
                return re.test(value);
            });
            formula = newFilter.map((val) => val);    
        }
        setFilterData(formula);
    };

    return (
        <>
            <div className="text-sm d-flex align-items-center text-xs">
                <span className="">
                    <div
                        role="button"
                        className=" text-xs ml-2 mt-1  label-content position-relative"
                        id="labels-viewers-button"
                        style={{ maxWidth: "100%", width: "fit-content" }}
                    >
                        <div
                            className="labels-container"
                            style={{ width: "fit-content", maxWidth: "100%" }}
                        >
                            {labelList.map((item) => (
                            <div key={item}>
                                {operators.includes(item.trim()) ? (
                                <div className="ml-1 mr-1 mt-2 text-xs">{item}</div> // You can place content here if needed
                                ) : (
                                <div className="label-list-box ml-1 mr-1 mb-1 text-xs">
                                    {item}
                                    <i
                                    className="fa fa-close text-xs ml-1 text-muted"
                                    role="button"
                                    onClick={() => handleRemoveLabel(item)}
                                    />
                                </div>
                                )}
                            </div>
                            ))}

                            <input
                                autoFocus
                                onKeyDown={handleBackspace}
                                onChange={handleFilter}
                                value={inputValue}
                                className="d-inline-block ml- no-focus-border mr-0 labels-input"
                                style={{ width: "max-content" }}
                                onFocus={() => setShowFilterOptions(true)}
                                onBlur={handleInputBlur}
                            />
                        </div>
                        {
                            showFilterOptions === true &&
                            filterData.length > 0 && (
                                <div
                                    className="bg-white text-dark position-absolute filter-bg submit-label"
                                    style={{
                                        zIndex: 20,
                                        left: 5,
                                        right: 5,
                                        top: "110%",
                                        overflow: "hidden"
                                    }}
                                >
                                    {filterData?.slice(0, 4)?.map((item, index) => (
                                        <div
                                            className="border m-0 pt-1 pb-1 border "
                                            key={index}
                                            onClick={() => {
                                                handleAddFormula(item);
                                            }}
                                        >
                                            {/* <a
                                                role="button"
                                                className=" w-100 pt-1 pb-1 text-black  text-decoration-none font-weight-normal"
                                            > */}
                                                <span className="pl-1">{`${item}`}</span>
                                            {/* </a> */}
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                </span>
            </div>

        </>
    );
};

export default LabelsFilter;
