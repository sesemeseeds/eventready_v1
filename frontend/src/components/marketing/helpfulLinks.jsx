import { useState } from 'react';
import { Button, Typography, Box, Card, Tooltip } from '@mui/material';
import canvaLogo from '../../images/canva-logo.png';
import figmaLogo from '../../images/figma-logo.png';
import adobeLogo from '../../images/adobe-logo.png';

const HelpfulLinksBox = () => {

    return (
      <Card>
        <Box
          style={{
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '10px',
              backgroundImage: 'linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)',
              padding: '10px',
              borderRadius: '5px',
              paddingLeft: '20px',
            }}
          >
            Helpful Links
          </Typography>
  
            <Box
              style={{
                padding: '20px',
                marginTop: '-10px',
                backgroundColor: 'white',
                borderRadius: '5px 5px 10px 10px',
              }}
            >
              <Typography variant="body1" style={{ color: 'black', marginBottom: '10px', marginTop: '5px' }}>
                Embarking on a creative journey with graphics? Dive into these fantastic resources to unleash your inner designer and craft amazing posters, vibrant flyers, eye-catching logos, and more for your spectacular event! Let your imagination run wild and bring your ideas to life!
              </Typography>
              <Box display="flex" justifyContent="space-evenly">
                <Tooltip title="Canva">
                  <Button
                    style={{
                      backgroundImage: `url(${canvaLogo})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      width: '40px',
                      height: '64px',
                    }}
                    onClick={() => window.open('https://www.canva.com/', '_blank')}
                  >
                  </Button>
                </Tooltip>
                <Tooltip title="Figma">
                  <Button
                    style={{
                      backgroundImage: `url(${figmaLogo})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      width: '20px',
                      height: '96px',
                    }}
                    onClick={() => window.open('https://www.figma.com/', '_blank')}
                  >
                  </Button>
                </Tooltip>
                <Tooltip title="Adobe">
                  <Button
                    style={{
                      backgroundImage: `url(${adobeLogo})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      width: '10px',
                      height: '62px',
                    }}
                    onClick={() => window.open('https://www.adobe.com/', '_blank')}
                  >
                  </Button>
                </Tooltip>
              </Box>
            </Box>
        </Box>
      </Card>
    );
  };
  
  export default HelpfulLinksBox;