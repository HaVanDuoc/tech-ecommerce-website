import * as React from "react"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Chip from "@mui/material/Chip"
import { Field } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { selectorCategory } from "~/redux/categorySlice"
import { requestBrands } from "~/api"
import { selectorBrands } from "~/redux/brandSlice"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name, brand, theme) {
    return {
        fontWeight: brand.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    }
}

export default function ListBrand({ props }) {
    const theme = useTheme()
    const [selected, setSelected] = React.useState([])
    const [list, setList] = React.useState([])
    const dispatch = useDispatch()

    const fetchAllBrands = useSelector(selectorBrands)?.payload?.null
    const fetchBrands = useSelector(selectorCategory)

    const brands = fetchBrands?.payload?.brands

    React.useEffect(() => {
        setSelected(brands ? brands.map((item) => item.name) : [])
    }, [brands])

    React.useEffect(() => {
        if (!fetchAllBrands) requestBrands(dispatch, {})
        setList(fetchAllBrands ? fetchAllBrands.map((item) => item.name) : [])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAllBrands])

    const handleChange = async (event) => {
        const {
            target: { value },
        } = event

        props.setFieldValue("brands", value)

        setSelected(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        )
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Thương hiệu</InputLabel>
                <Field
                    as={Select}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    name="brands"
                    value={selected}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Thương hiệu" />}
                    renderValue={(selected) => {
                        return (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )
                    }}
                    MenuProps={MenuProps}
                >
                    {list.length > 0 &&
                        list.map((name) => {
                            return (
                                <MenuItem key={name} value={name} style={getStyles(name, selected, theme)}>
                                    {name}
                                </MenuItem>
                            )
                        })}
                </Field>
            </FormControl>
        </div>
    )
}
