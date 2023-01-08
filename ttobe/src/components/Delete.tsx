import Image from "next/image";
import styled from "styled-components";

interface Props {
    width?: string;
    height?: string;
    src?: string;
    alt?: string;
    margin?: string;
}

const Delete = ({
    src = "/img/delete.png",
    alt ="arrow",
    margin = "40px",   
}: Props) => {
    return (
        <ImgWrapper margin={margin}>
            <Image width={35} height={35} src={src} alt={alt} />
        </ImgWrapper>
    )
}

export default Delete;

interface wrapperProps {
    margin?: string;
    radius?: string;
}

const ImgWrapper = styled.span<wrapperProps>`
    align-items: center;
    img {
        border-radius: ${(props) => props.radius};
    }
`;