import React, { Dispatch, SetStateAction, useState } from 'react';
import { SelectableTrait } from '.';
import { Box, Grid, Typography } from '@mui/material';
import { commonStyles } from '@/sharedStyles';
import { AvatarState } from '@/pages/welcome';
import { Animal, Element, Item, Power } from '@/const/avatar.const';
import Image from 'next/image';
import { TraitConstants } from '@/utils/character.utils';

interface TraitSelectorProps {
    traitBeingSelected: SelectableTrait
    setTraitBeingSelected: (trait: SelectableTrait) => void
    avatarState: AvatarState
    setAvatarState: Dispatch<SetStateAction<AvatarState>>
}

interface TraitSelection {
    trait: string
    selection: string
}

const TraitSelector: React.FC<TraitSelectorProps> = ({
    traitBeingSelected,
    setTraitBeingSelected,
    avatarState,
    setAvatarState
}) => {
    const [traitSelection, setTraitSelection] = useState <TraitSelection>({
        trait: traitBeingSelected,
        selection: ""
    })

    return (
        traitBeingSelected === SelectableTrait.ANMIAL ?
            <>
                <Box
                    sx={{
                    alignSelf: "center",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    width: '92%',
                    padding: '20px',
                    backgroundColor: commonStyles.colors.brown,
                    background: `linear-gradient(145deg, ${commonStyles.colors.brown}, ${commonStyles.colors.darkBrown})`, // Gradient background
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                    marginBottom: 4,
                    }}
                >
                    <Typography
                    fontSize={43} 
                    fontFamily={'monospace'} 
                    sx={{ 
                        textAlign: "center", 
                        color: "white",
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.2s ease-in-out',
                    }}>
                    {
                        traitSelection.selection === Animal.HAWK    ? 'Are you a Hawk?' :
                        traitSelection.selection === Animal.OWL     ? 'Are you an Owl?' :
                        traitSelection.selection === Animal.DOLPHIN ? 'Are you a Dolphin?' 
                        : 'Are you a Hawk, Owl, or Dolphin?'
                    }
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {
                        Object.values(TraitConstants.Animal.options)
                        .map ((animal: any) => (
                            <Grid item xs={4} key={animal}>
                            <Box
                                onClick={() => {setTraitSelection ({...traitSelection, selection: animal})}}
                                sx={{
                                    borderRadius: "10px",
                                    padding: "8px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    backgroundColor: avatarState.animal === animal ? "green" : "none",groundColor: avatarState.animal === animal ? "green" : "none",
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)', // Subtle zoom effect on hover
                                        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                                    },  
                                }}
                            >
                                <Image src={`/images/animal/${avatarState.animal}.png`} alt={animal} width={280} height={280} />
                            </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </> : 
            
        traitBeingSelected === SelectableTrait.ELEMENT ?
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Grid 
                    container 
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: '100%' }}
                >
                    {
                        TraitConstants.Element.options
                        .map ((element: Element) => (
                            <Grid 
                            item 
                            xs={6}
                            display="flex"
                            justifyContent="center"
                            key={element}
                            >
                            <Box
                                onClick={() => setTraitSelection ({...traitSelection, selection: element})}
                                sx={{
                                textAlign: "center",
                                cursor: "pointer",
                                padding: "8px",
                                background: 
                                    traitSelection.selection === element 
                                    ? "linear-gradient(145deg, green, grey)" // Gradient lighter grey when not selected
                                    : "linear-gradient(145deg, grey, #1c1c1c)",  // Gradient dark grey when selected
                                    // commonStyles.colors.lightBrown, // Dark brown background
                                    // , // Dark brown background
                                borderRadius: "10px",  // Optional: Add rounded corners for a smoother look
                                boxShadow: 
                                    traitSelection.selection === element 
                                    ? '0px 4px 10px rgba(0, 255, 0, 0.5)'
                                    : '0px 2px 6px rgba(0, 0, 0, 0.4)',
                                }}
                            >
                                <Image src={`/images/element/${element}.png`} alt={element} width={240} height={240} />
                            </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        
        : traitBeingSelected === SelectableTrait.ITEM ?
            <>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        width: '92%',  // Full width
                        padding: '30px', // Give enough padding for the text
                        backgroundColor: commonStyles.colors.brown, // Brown background
                        marginBottom: 4,
                    }}
                    >
                    <Typography fontWeight={'bold'} fontFamily={'monospace'} variant="h4" sx={{ textAlign: "center", color: "white" }}>
                        Pick a magic item to save the world.
                    </Typography>
                </Box>
                {/* Grid for the items */}
                <Grid 
                    container 
                    spacing={2} 
                    justifyContent="center" // Centers the grid horizontally
                    alignItems="center"     // Aligns the items inside grid vertically
                    sx={{ width: '100%' }}  // Ensures the grid takes up the full width
                >
                    {itemOptions.map((item) => (
                        <Grid item xs={4} key={item}>
                            <Box
                                onClick={() => {
                                if (socket)
                                    socket.emit('requestItem', item);
                                setSelectedItem(item);
                                }}
                                sx={{
                                textAlign: "center",
                                cursor: "pointer",
                                border: 
                                    selectedItem === item 
                                    ? 
                                    itemSelectionStatus === 'requested'
                                    ? "2px solid green"
                                    : "1px solid gray"
                                    : 
                                    "none",
                                paddingTop: 3,
                                paddingBottom: 3,
                                borderRadius: 10,
                                background: `linear-gradient(145deg, ${commonStyles.colors.darkBrown}, ${commonStyles.colors.veryDarkBrown})`, // Gradient background
                                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)', // Outer shadow for realism
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)', // Subtle zoom effect on hover
                                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                                },
                                }}
                            >
                                <Image src={`/images/item/${item}.png`} alt={item} width={280} height={280} />
                                <Typography marginTop={2} color='white' fontFamily={'monospace'} fontSize={30}>{item}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </>
        
        : traitBeingSelected === SelectableTrait.POWER ? (
            <>
                {/* Brown Container for the Heading */}
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    width: '92%',  // Full width
                    padding: '30px', // Give enough padding for the text
                    backgroundColor: commonStyles.colors.brown, // Brown background
                    }}
                >
                    <Typography fontFamily={'monospace'} variant="h4" sx={{ textAlign: "center", color: "white" }}>
                    {selectedItem ? `Choose a magic power for your ${selectedItem}` : "Pick a power for your item"}
                    </Typography>
                </Box>

                {/* Grid for the powers */}
        <Grid 
                     container 
                    spacing={5} 
                    justifyContent="center" // Centers the grid horizontally
                    alignItems="center"     // Aligns the items inside grid vertically
                    sx={{ width: '100%', height:"90%" }}  // Ensures the grid takes up the full width
                >
                    {powerOptions.map((power: PowerType) => {
                    console.log ('got itemPowerDescription', getItemPowerPath (selectedItem as ItemType, power))
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={power}>  {/* Use xs={3} for 4 columns */}
                        <Box
                            onClick={() => {
                            if (socket) socket.emit('requestPower', power);
                            setSelectedPower (selectedItem === 'shield' && power === 'gear' ? 'resistance' : power)
                            }}
                            sx={{
                            height: '430px',
                            width: '300px',
                            textAlign: "center",
                            cursor: "pointer",
                            border:
                                selectedPower === power
                                ? powerSelectionStatus === 'requested'
                                    ? "2px solid green"
                                    : "1px solid gray"
                                : "none",
                            paddingTop: 3,
                            paddingBottom: 3,
                            borderRadius: 10,
                            background: `linear-gradient(145deg, ${commonStyles.colors.darkBrown}, ${commonStyles.colors.veryDarkBrown})`, // Gradient background
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)', // Outer shadow for realism
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)', // Subtle zoom effect on hover
                                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                            },
                            }}
                        >
                            <Image src={getItemPowerPath(selectedItem, power)} alt={power} width={180} height={180} />
                            <Typography padding={2} marginTop={2} color='white' fontFamily={'monospace'} fontSize={20}>
                            {getItemPowerDescription(selectedItem as ItemType, power)}
                            </Typography>
                        </Box>
                        </Grid>
                    )
                    })}
                </Grid>
            </>
        )
        :
            <></>
    )
}

export default TraitSelector;