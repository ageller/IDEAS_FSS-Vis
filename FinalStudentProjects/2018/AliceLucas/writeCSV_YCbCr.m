a = imread('lizzard.png');
%Crop out lower border which includes "Harmonic" text
%cobnvert to RGB
%experiment with downscale
b=imresize(a,0.25);
%Convert to yCbCr
b = rgb2ycbcr(b);
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files_YCbCr/d4_2/lizzard.csv',c)

a = imread('tiger.png');
%Crop out lower border which includes "Harmonic" text
%cobnvert to RGB
%experiment with downscale
b=imresize(a,0.25);
%Convert to yCbCr
b = rgb2ycbcr(b);
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files_YCbCr/d4_2/tiger.csv',c)

a = imread('lizzard.png');
%Crop out lower border which includes "Harmonic" text
%cobnvert to RGB
%experiment with downscale
b=imresize(a,0.25);
%Convert to yCbCr
b = rgb2ycbcr(b);
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files_YCbCr/d4_2/lizzard.csv',c)

a = imread('temple.png');
%Crop out lower border which includes "Harmonic" text
%cobnvert to RGB
%experiment with downscale
b=imresize(a,0.25);
%Convert to yCbCr
b = rgb2ycbcr(b);
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files_YCbCr/d4_2/temple.csv',c)

a = imread('temple_1.png');
%Crop out lower border which includes "Harmonic" text
%cobnvert to RGB
%experiment with downscale
b=imresize(a,0.25);
%Convert to yCbCr
b = rgb2ycbcr(b);
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files_YCbCr/d4_2/temple_1.csv',c)

a = imread('agriculture.png');
%Crop out lower border which includes "Harmonic" text
%cobnvert to RGB
%experiment with downscale
b=imresize(a,0.25);
%Convert to yCbCr
b = rgb2ycbcr(b);
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files_YCbCr/d4_2/agriculture.csv',c)


a = imread('children.png');
%Crop out lower border which includes "Harmonic" text
%cobnvert to RGB
%experiment with downscale
b=imresize(a,0.25);
%Convert to yCbCr
b = rgb2ycbcr(b);
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files_YCbCr/d4_2/children.csv',c)

