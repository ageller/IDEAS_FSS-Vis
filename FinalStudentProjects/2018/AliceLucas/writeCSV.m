b = imread('temple.png');
%a = a(1:460,:,:);
%experiment with downscale
%b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/original/temple.csv',c)

b = imread('temple_1.png');
%a = a(1:460,:,:);
%experiment with downscale
%b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/original/temple_1.csv',c)


b = imread('children.png');
%a = a(1:460,:,:);
%experiment with downscale
%b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/original/children.csv',c)


b = imread('agriculture.png');
%a = a(1:460,:,:);
%experiment with downscale
%b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/original/agriculture.csv',c)


b = imread('lizzard.png');
%a = a(1:460,:,:);
%experiment with downscale
%b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/original/lizzard.csv',c)


b = imread('tiger.png');
%a = a(1:460,:,:);
%experiment with downscale
b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/original/tiger.csv',c)

