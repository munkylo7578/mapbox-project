import React from 'react'
 import {Box,Typography,Button,Card,CardMedia,CardContent,CardActions,Chip} from '@material-ui/core'
import {LocationOn} from '@material-ui/icons';
import PhoneIcon from '@mui/icons-material/Phone';
import {Rating} from "@material-ui/lab";
import useStyles from './styles'

const PlaceDetails = ({place}) => {
    const classes = useStyles()
    return (
        <Card elevation = {6}>
            <CardMedia
                style={{height:350}} 
                image={place.photo ? place.photo.images.large.url:'https://image.flaticon.com/icons/png/512/34/34754.png'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award)=>{
              
                    return(
                        <Box my={1} key={Math.random()} display="flex" sx={{justifyContent:"space-between"}}>
                            <img src={award.images.small} alt={award.display_name ? award.display_name :'' } />
                            <Typography variant = 'subtitle2' color="textSecondary" >{award.display_name}</Typography>
                        </Box>
                    )
                })}
                {place?.cuisine?.map(({name})=>{
                    return <Chip key={name} size='small' label={name} className={classes.chip}/>
                })}
                {place?.address && (
                    <Typography  gutterBottom variant = "subtitle2" color="textSecondary" className={classes.subtitle}>
                        <LocationOn /> {place.address}
                    </Typography>
                )}
                 {place?.phone && (
                    <Typography   gutterBottom variant = "subtitle2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size="small" color="primary" onClick={()=>window.open(place.web_url,'_blank')} >
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={()=>window.open(place.website,'_blank')} >
                       Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default PlaceDetails
